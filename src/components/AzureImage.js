// src/components/AzureImage.js

import axios from 'axios';
import RNFS from 'react-native-fs';

const AzureImage = async fileUri => {
  try {
    const pathSegments = fileUri.split('/');
    const filename = pathSegments[pathSegments.length - 1];

    const generateNewFilename = original => {
      const firstFour = original.slice(0, 4);
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.-]/g, '')
        .slice(0, 12); // YYYYMMDDTHH
      return `profilePic_${firstFour}_${timestamp}.jpg`;
    };

    const getFileExtension = name => {
      return name.slice(((name.lastIndexOf('.') - 1) >>> 0) + 2);
    };

    const fileExtension = getFileExtension(filename);
    const mimeType =
      fileExtension === 'png'
        ? 'image/png'
        : fileExtension === 'jpg' || fileExtension === 'jpeg'
        ? 'image/jpeg'
        : 'image/jpeg'; // default fallback

    const newFilename = generateNewFilename(filename);

    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      type: mimeType,
      name: newFilename,
    });

    const response = await axios.post(
      `https://thinkzone.co/cloud-storage/uploadFile/${newFilename}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const remoteUrl = response?.data?.url;
    if (!remoteUrl) {
      throw new Error('Upload failed: No URL returned');
    }

    // Save image to local storage
    const localPath = `${RNFS.DocumentDirectoryPath}/${newFilename}`;
    const downloadResult = await RNFS.downloadFile({
      fromUrl: remoteUrl,
      toFile: localPath,
    }).promise;

    if (downloadResult.statusCode === 200) {
      return {
        success: true,
        remoteUrl,
        localPath: `file://${localPath}`,
      };
    } else {
      throw new Error('Image download failed');
    }
  } catch (error) {
    console.error('AzureImage Error:', error);
    return {success: false, remoteUrl: null, localPath: null};
  }
};

export default AzureImage;
