import fs from "fs";
import path from "path";
import axios from "axios";
import mime from "mime-types";
import cron from "node-cron";

require("dotenv").config();
async function getTokenFromFile(tokenFilePath: string) {
  try {
    const token = await fs.promises.readFile(tokenFilePath, "utf-8");
    return token.trim();
  } catch (err) {
    console.error("❌ Failed to read token from file:", tokenFilePath);
    return null;
  }
}
const videoExtensions = [".mp4", ".avi", ".mov", ".mkv", ".flv", ".wmv"];
const photoExtensions = [".jpg", ".jpeg", ".png", ".gif"];

async function getVideoFileNames(folderPath: string) {
  const files = await fs.promises.readdir(folderPath);
  const videoFiles = files.filter((file) =>
    videoExtensions.includes(path.extname(file).toLowerCase())
  );
  return videoFiles;
}
async function getPhotoFileNames(folderPath: string) {
  const files = await fs.promises.readdir(folderPath);
  const photoFiles = files.filter((file) =>
    photoExtensions.includes(path.extname(file).toLowerCase())
  );
  return photoFiles;
}

async function syncAssets() {
  try {
    const token = await getTokenFromFile(
      path.join(__dirname, "..", "..", "token.txt")
    );
    if (!token) {
      console.error(
        "❌ Token not found. please login again via assessor id and password"
      );
      return;
    }

    const baseDir = path.join(__dirname, "..", "..", "uploads", "batches");
    const batchDirs = await fs.promises.readdir(baseDir, {
      withFileTypes: true,
    });
    for (const batchDir of batchDirs) {
      if (batchDir.isDirectory()) {
        const batchId = batchDir.name;
        const candidatesDir = path.join(
          baseDir,
          batchId,
          "evidences",
          "candidates"
        );
        const candidateDirs = await fs.promises.readdir(candidatesDir, {
          withFileTypes: true,
        });
        for (const candidateDir of candidateDirs) {
          if (candidateDir.isDirectory()) {
            const candidateId = candidateDir.name;
            const theoryPhotosDir = path.join(
              candidatesDir,
              candidateId,
              "photos",
              "THEORY"
            );
            const theoryVideosDir = path.join(
              candidatesDir,
              candidateId,
              "videos",
              "THEORY"
            );
            const practicalPhotosDir = path.join(
              candidatesDir,
              candidateId,
              "photos",
              "PRACTICAL"
            );
            const practicalVideosDir = path.join(
              candidatesDir,
              candidateId,
              "videos",
              "PRACTICAL"
            );
            const vivaVideosDir = path.join(
              candidatesDir,
              candidateId,
              "videos",
              "VIVA"
            );
            const practicalOnboardingDir = path.join(
              __dirname,
              "..",
              "..",
              "uploads",
              "batches",
              batchId,
              "evidences",
              "candidates",
              candidateId,
              "practical-onboarding"
            );
            const pmkyChecklistDir = path.join(
              __dirname,
              "..",
              "..",
              "uploads",
              "batches",
              batchId,
              "evidences",
              "assessor",
              "pmky-checklist"
            );
            if (fs.existsSync(theoryPhotosDir)) {
              if (fs.existsSync(path.join(theoryPhotosDir, "meta.json"))) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(theoryPhotosDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=image&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(theoryPhotosDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  await axios.put(url, buffer, {
                    headers: {
                      "Content-Type":
                        mime.lookup(fileName) || "application/octet-stream",
                    },
                  });
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(theoryPhotosDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getPhotoFileNames(theoryPhotosDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(theoryPhotosDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(theoryVideosDir)) {
              if (fs.existsSync(path.join(theoryVideosDir, "meta.json"))) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(theoryVideosDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(theoryVideosDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  await axios.put(url, buffer, {
                    headers: {
                      "Content-Type":
                        mime.lookup(fileName) || "application/octet-stream",
                    },
                  });
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(theoryVideosDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getVideoFileNames(theoryVideosDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(theoryVideosDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(practicalPhotosDir)) {
              if (fs.existsSync(path.join(practicalPhotosDir, "meta.json"))) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(practicalPhotosDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=image&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(practicalPhotosDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  await axios.put(url, buffer, {
                    headers: {
                      "Content-Type":
                        mime.lookup(fileName) || "application/octet-stream",
                    },
                  });
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(practicalPhotosDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getPhotoFileNames(practicalPhotosDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(practicalPhotosDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(practicalVideosDir)) {
              if (fs.existsSync(path.join(practicalVideosDir, "meta.json"))) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(practicalVideosDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(practicalVideosDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  await axios.put(url, buffer, {
                    headers: {
                      "Content-Type":
                        mime.lookup(fileName) || "application/octet-stream",
                    },
                  });
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(practicalVideosDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getVideoFileNames(practicalVideosDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(practicalVideosDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(vivaVideosDir)) {
              if (fs.existsSync(path.join(vivaVideosDir, "meta.json"))) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(vivaVideosDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(vivaVideosDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  await axios.put(url, buffer, {
                    headers: {
                      "Content-Type":
                        mime.lookup(fileName) || "application/octet-stream",
                    },
                  });
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(vivaVideosDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getVideoFileNames(vivaVideosDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(vivaVideosDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(practicalOnboardingDir)) {
              if (
                fs.existsSync(path.join(practicalOnboardingDir, "meta.json"))
              ) {
                const metadata = JSON.parse(
                  fs.readFileSync(
                    path.join(practicalOnboardingDir, "meta.json"),
                    "utf-8"
                  )
                );
                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                const response = await axios.get(
                  `${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates/${candidateId}/presigned-url-to-candidate-practical-onboarding-files`,
                  {
                    headers: {
                      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                    },
                  }
                );
                const adhar = response.data.data.adhar;
                const photo = response.data.data.photo;
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const filePath = path.join(practicalOnboardingDir, fileName);
                  const buffer = fs.readFileSync(filePath);
                  const fileType = mime.lookup(fileName);
                  if (fileName.startsWith("adhar")) {
                    await axios.put(adhar, buffer, {
                      headers: {
                        "Content-Type": fileType || "application/octet-stream",
                      },
                    });
                    metadata.files[fileName].isUploaded = true;
                    fs.writeFileSync(
                      path.join(practicalOnboardingDir, "meta.json"),
                      JSON.stringify(metadata, null, 2)
                    );
                  } else if (fileName.startsWith("photo")) {
                    await axios.put(photo, buffer, {
                      headers: {
                        "Content-Type": fileType || "application/octet-stream",
                      },
                    });
                    metadata.files[fileName].isUploaded = true;
                    fs.writeFileSync(
                      path.join(practicalOnboardingDir, "meta.json"),
                      JSON.stringify(metadata, null, 2)
                    );
                  }
                }
              } else {
                const metadata = {
                  files: {},
                  isFolderSynced: false,
                };
                const files = await getPhotoFileNames(practicalOnboardingDir);
                for (const file of files) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                const videos = await getVideoFileNames(practicalOnboardingDir);
                for (const file of videos) {
                  // @ts-ignore
                  metadata.files[file] = {
                    isUploaded: false,
                    fileName: file,
                  };
                }
                fs.writeFileSync(
                  path.join(practicalOnboardingDir, "meta.json"),
                  JSON.stringify(metadata, null, 2)
                );
              }
            }
            if (fs.existsSync(pmkyChecklistDir)) {
              const entries = await fs.promises.readdir(pmkyChecklistDir, {
                withFileTypes: true,
              });
              const dirs = entries
                .filter((entry) => entry.isDirectory())
                .map((entry) => entry.name);
              for (const dir of dirs) {
                if (
                  fs.existsSync(
                    path.join(
                      pmkyChecklistDir,
                      // @ts-ignore
                      dir.split("/").pop(),
                      "meta.json"
                    )
                  )
                ) {
                  const metadata = JSON.parse(
                    fs.readFileSync(
                      path.join(
                        pmkyChecklistDir,
                        // @ts-ignore
                        dir.split("/").pop(),
                        "meta.json"
                      ),
                      "utf-8"
                    )
                  );
                  const files = metadata.files;
                  const fileNames =
                    typeof files === "object" ? Object.keys(files) : [];
                  for (const fileName of fileNames) {
                    if (files[fileName].isUploaded) {
                      continue;
                    }
                    const response = await axios.get(
                      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/pmky-checklist-presigned-url?fileNames=${fileName}&questionId=${dir}`,
                      {
                        headers: {
                          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM0OTk0ZDBkNTdkZDMxNTY3YzYzNmEiLCJpYXQiOjE3NDc1NTMxMjF9.NY_HSBdxkdGWfB2FeCsxS0fkZqNHGZUnPnTgrUAWrVw`,
                        },
                      }
                    );
                    const url = response?.data?.data[0];
                    if (!url) {
                      continue;
                    }
                    const filePath = path.join(
                      pmkyChecklistDir,
                      // @ts-ignore
                      dir.split("/").pop(),
                      fileName
                    );
                    const buffer = fs.readFileSync(filePath);
                    await axios.put(url, buffer, {
                      headers: {
                        "Content-Type":
                          mime.lookup(fileName) || "application/octet-stream",
                      },
                    });
                    metadata.files[fileName].isUploaded = true;
                    fs.writeFileSync(
                      path.join(
                        pmkyChecklistDir,
                        // @ts-ignore
                        dir.split("/").pop(),
                        "meta.json"
                      ),
                      JSON.stringify(metadata, null, 2)
                    );
                  }
                } else {
                  const metadata = {
                    files: {},
                    isFolderSynced: false,
                  };
                  const photos = await getPhotoFileNames(
                    path.join(pmkyChecklistDir, dir)
                  );
                  for (const file of photos) {
                    // @ts-ignore
                    metadata.files[file] = {
                      isUploaded: false,
                      fileName: file,
                    };
                  }
                  const videos = await getVideoFileNames(
                    path.join(pmkyChecklistDir, dir)
                  );
                  for (const file of videos) {
                    // @ts-ignore
                    metadata.files[file] = {
                      isUploaded: false,
                      fileName: file,
                    };
                  }
                  fs.writeFileSync(
                    path.join(
                      pmkyChecklistDir,
                      // @ts-ignore
                      dir.split("/").pop(),
                      "meta.json"
                    ),
                    JSON.stringify(metadata, null, 2)
                  );
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("❌ Error during sync:", error);
  }
}

const startJob = async () => {
  cron.schedule("* * * * *", async () => {
    try {
      await syncAssets();
      console.log("syncing");
    } catch (error) {
      console.error("❌ Error during scheduled job:", error);
    }
  });
};
export default startJob;
