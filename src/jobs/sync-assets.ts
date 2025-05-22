import fs from "fs";
import path from "path";
import axios from "axios";
import mime from "mime-types";
import cron from "node-cron";
import dns from "dns";

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
// check metadata file is present or not
// async function isSomethingToUpload() {
//   const baseDir = path.join(__dirname, "..", "..", "uploads", "batches");
//   const batchDirs = await fs.promises.readdir(baseDir, {
//     withFileTypes: true,
//   });
//   for (const batchDir of batchDirs) {
//     if (batchDir.isDirectory()) {
//       const batchId = batchDir.name;
//       const candidatesDir = path.join(
//         baseDir,
//         batchId,
//         "evidences",
//         "candidates"
//       );
//       const candidateDirs = await fs.promises.readdir(candidatesDir, {
//         withFileTypes: true,
//       });
//       for (const candidateDir of candidateDirs) {
//         if (candidateDir.isDirectory()) {
//           const candidateId = candidateDir.name;
//           const theoryPhotosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "photos",
//             "THEORY"
//           );
//           const theoryVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "THEORY"
//           );
//           const practicalPhotosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "photos",
//             "PRACTICAL"
//           );
//           const practicalVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "PRACTICAL"
//           );
//           const vivaVideosDir = path.join(
//             candidatesDir,
//             candidateId,
//             "videos",
//             "VIVA"
//           );
//           const practicalOnboardingDir = path.join(
//             __dirname,
//             "..",
//             "..",
//             "uploads",
//             "batches",
//             batchId,
//             "evidences",
//             "candidates",
//             candidateId,
//             "practical-onboarding"
//           );
//           const pmkyChecklistDir = path.join(
//             __dirname,
//             "..",
//             "..",
//             "uploads",
//             "batches",
//             batchId,
//             "evidences",
//             "assessor",
//             "pmky-checklist"
//           );
//           if (fs.existsSync(theoryPhotosDir)) {
//             if (fs.existsSync(path.join(theoryPhotosDir, "meta.json"))) {
//               const metadata = JSON.parse(
//                 fs.readFileSync(
//                   path.join(theoryPhotosDir, "meta.json"),
//                   "utf-8"
//                 )
//               );
//               const files = metadata.files;
//               const fileNames =
//                 typeof files === "object" ? Object.keys(files) : [];
//               for (const fileName of fileNames) {
//                 if (!files[fileName].isUploaded) {
//                   return true;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   return false;
// }

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
    if (!fs.existsSync(baseDir)) {
      console.error("❌ Base directory does not exist");
      return;
    }
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
                const filesInFolder = await fs.promises.readdir(
                  theoryPhotosDir
                );

                const files = metadata.files;
                const fileNames =
                  typeof files === "object" ? Object.keys(files) : [];
                let isNewFileUplaoded = false;
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(theoryPhotosDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=image&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }

                  const filePath = path.join(theoryPhotosDir, fileName);
                  if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    console.log(
                      "syncing file of batch ",
                      batchId,
                      " candidate ",
                      candidateId,
                      " file name ",
                      fileName
                    );
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
                let isNewFileUplaoded = false;
                const filesInFolder = await fs.promises.readdir(
                  theoryVideosDir
                );
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(theoryVideosDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=theory&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(theoryVideosDir, fileName);
                  if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    console.log(
                      "syncing file of batch ",
                      batchId,
                      " candidate ",
                      candidateId,
                      " file name ",
                      fileName
                    );
                    await axios.put(url, buffer, {
                      headers: {
                        "Content-Type":
                          mime.lookup(fileName) || "application/octet-stream",
                      },
                    });
                  }

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
                let isNewFileUplaoded = false;
                const filesInFolder = await fs.promises.readdir(
                  practicalPhotosDir
                );
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(practicalPhotosDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=image&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(practicalPhotosDir, fileName);
                  if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    console.log(
                      "[PRACTICAL-PHOTOS]syncing file of batch ",
                      batchId,
                      " candidate ",
                      candidateId,
                      " file name ",
                      fileName
                    );
                    await axios.put(url, buffer, {
                      headers: {
                        "Content-Type":
                          mime.lookup(fileName) || "application/octet-stream",
                      },
                    });
                  }
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
                let isNewFileUplaoded = false;
                const filesInFolder = await fs.promises.readdir(
                  practicalVideosDir
                );
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(practicalVideosDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  const url = response.data.data.url;
                  if (!url) {
                    continue;
                  }
                  const filePath = path.join(practicalVideosDir, fileName);
                  if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    console.log(
                      "[PRACTICAL-VIDEOS]syncing file of batch ",
                      batchId,
                      " candidate ",
                      candidateId,
                      " file name ",
                      fileName
                    );
                    await axios.put(url, buffer, {
                      headers: {
                        "Content-Type":
                          mime.lookup(fileName) || "application/octet-stream",
                      },
                    });
                  }
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
                let isNewFileUplaoded = false;
                const filesInFolder = await fs.promises.readdir(vivaVideosDir);
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(vivaVideosDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const response = await axios.get(
                    `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/candidates/${candidateId}/sync-random-evidences?testType=practical&evidenceType=video&fileName=${fileName}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  if (response.status !== 200) {
                    console.log("error in getting presigned url");
                    continue;
                  }
                  const url = response.data.data.url;
                  if (!url) {
                    console.log("url not found");
                    continue;
                  }
                  const filePath = path.join(vivaVideosDir, fileName);
                  if (fs.existsSync(filePath)) {
                    const buffer = fs.readFileSync(filePath);
                    console.log(
                      "[VIVA-VIDEOS]syncing file of batch ",
                      batchId,
                      " candidate ",
                      candidateId,
                      " file name ",
                      fileName
                    );
                    await axios.put(url, buffer, {
                      headers: {
                        "Content-Type":
                          mime.lookup(fileName) || "application/octet-stream",
                      },
                    });
                  }

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
                let isNewFileUplaoded = false;
                const filesInFolder = await fs.promises.readdir(
                  practicalOnboardingDir
                );
                for (const fileName of filesInFolder) {
                  if (fileName === "meta.json") {
                    continue;
                  }
                  if (!files[fileName]) {
                    isNewFileUplaoded = true;
                    break;
                  }
                }
                if (isNewFileUplaoded) {
                  const updateMetadata = { ...metadata };
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      // @ts-ignore
                      updateMetadata.files[fileName] = {
                        isUploaded: false,
                        fileName: fileName,
                      };
                    }
                  }
                  fs.writeFileSync(
                    path.join(practicalOnboardingDir, "meta.json"),
                    JSON.stringify(updateMetadata, null, 2)
                  );
                  return;
                }
                const response = await axios.get(
                  `${process.env.MAIN_SERVER_URL}/assessor/batches/${batchId}/candidates/${candidateId}/presigned-url-to-candidate-practical-onboarding-files`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                const adhar = response.data.data.adhar;
                const photo = response.data.data.photo;
                console.log("SYNCING ADHAR AND PHOTO PRACTICAL ONBOARDING");
                for (const fileName of fileNames) {
                  if (files[fileName].isUploaded) {
                    continue;
                  }
                  const filePath = path.join(practicalOnboardingDir, fileName);

                  let isExists = false;
                  if (fs.existsSync(filePath)) {
                    isExists = true;
                  }
                  const buffer = fs.readFileSync(filePath);
                  const fileType = mime.lookup(fileName);

                  if (fileName.startsWith("adhar") && isExists) {
                    await axios.put(adhar, buffer, {
                      headers: {
                        "Content-Type": fileType || "application/octet-stream",
                      },
                    });
                  } else if (fileName.startsWith("photo") && isExists) {
                    await axios.put(photo, buffer, {
                      headers: {
                        "Content-Type": fileType || "application/octet-stream",
                      },
                    });
                  }
                  metadata.files[fileName].isUploaded = true;
                  fs.writeFileSync(
                    path.join(practicalOnboardingDir, "meta.json"),
                    JSON.stringify(metadata, null, 2)
                  );
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
                  let isNewFileUplaoded = false;
                  const filesInFolder = await fs.promises.readdir(
                    path.join(pmkyChecklistDir, dir)
                  );
                  for (const fileName of filesInFolder) {
                    if (fileName === "meta.json") {
                      continue;
                    }
                    if (!files[fileName]) {
                      isNewFileUplaoded = true;
                      break;
                    }
                  }
                  if (isNewFileUplaoded) {
                    const updateMetadata = { ...metadata };
                    for (const fileName of filesInFolder) {
                      if (fileName === "meta.json") {
                        continue;
                      }
                      if (!files[fileName]) {
                        // @ts-ignore
                        updateMetadata.files[fileName] = {
                          isUploaded: false,
                          fileName: fileName,
                        };
                      }
                    }
                    fs.writeFileSync(
                      path.join(
                        pmkyChecklistDir,
                        // @ts-ignore
                        dir.split("/").pop(),
                        "meta.json"
                      ),
                      JSON.stringify(updateMetadata, null, 2)
                    );
                    return;
                  }

                  for (const fileName of fileNames) {
                    if (files[fileName].isUploaded) {
                      continue;
                    }
                    const response = await axios.get(
                      `${process.env.MAIN_SERVER_URL}/assessor/offline-batches/${batchId}/pmky-checklist-presigned-url?fileNames=${fileName}&questionId=${dir}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
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
                    if (fs.existsSync(filePath)) {
                      console.log("SYNCING PMKY CHECKLIST FILES");
                      const buffer = fs.readFileSync(filePath);
                      await axios.put(url, buffer, {
                        headers: {
                          "Content-Type":
                            mime.lookup(fileName) || "application/octet-stream",
                        },
                      });
                    }
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
  let lock = false;
  cron.schedule("* * * * *", async () => {
    try {
      dns.lookup("google.com", async (err) => {
        if (err && err.code === "ENOTFOUND") {
          console.log("no internet");
        } else {
          if (lock) {
            console.log("Job is already running");
            return;
          }
          lock = true;
          await syncAssets()
            .catch((error) => {
              lock = false;
            })
            .finally(() => {
              lock = false;
            });
          lock = false;
        }
      });
    } catch (error) {
      console.error("❌ Error during scheduled job:", error);
    }
  });
};
export default startJob;
