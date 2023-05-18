import * as FileSystem from "expo-file-system";
import ReaderComponent from "./ReaderComponent";
import { memo, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { ReaderProvider } from "@epubjs-react-native/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReadPage = ({ book }: any) => {
  const { isConnected } = NetInfo.useNetInfo();
  const { StorageAccessFramework } = FileSystem;
  const [Permission, setPermission] = useState("");
  const downloadPath = FileSystem.documentDirectory;
  const [lastLocation, setLastLocation] = useState("0");
  const [OfflineEpub, setOfflineEpub] = useState(book.data);

  useEffect(() => {
    const FetchEpub = async () => {
      const data = await AsyncStorage.getItem("OfflineEpub" + book.nome);
      if (!isConnected) {
        if (data != null) {
          await FileSystem.getInfoAsync(data).then((response) => {
            const { exists, uri } = response;
            if (exists) {
              FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              }).then((response) => {
                setOfflineEpub(response);
              });
            }
          });
        } else {
          await downloadFile(book.ref);
        }
      }
    };
    FetchEpub();
    loadStorageData(book);
  }, []);

  // retorna para a última página lida
  async function loadStorageData(book: any) {
    let storageLocation = await AsyncStorage.getItem(book._id);
    if (storageLocation) {
      setLastLocation(storageLocation);
    }
  }

  //salva o arquivo na memória
  const saveAndroidFile = async (fileUri: any, fileName = book.nome) => {
    try {
      const fileString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      try {
        const directoryUri = await AsyncStorage.getItem(
          "permissionDirectoryUrl"
        );
        if (!directoryUri) {
          const permissions =
            await StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (!permissions.granted) {
            return;
          } else {
            await AsyncStorage.setItem(
              "permissionDirectoryUrl",
              permissions.directoryUri
            );
            setPermission(permissions.directoryUri);
          }
        } else {
          setPermission(directoryUri);
        }

        await StorageAccessFramework.createFileAsync(
          Permission,
          fileName,
          "application/epub+zip"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, fileString, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => {});
      } catch (e) {}
    } catch (err) {}
  };

  //faz o download do arquivo
  const downloadFile = async (fileUrl: any) => {
    let fileName = book.nome;

    const downloadResumable = FileSystem.createDownloadResumable(
      fileUrl,
      downloadPath + fileName,
      {
        cache: true,
        headers: {
          "X-Amz-Content-Sha256": `${book.headers["X-Amz-Content-Sha256"]}`,
          "X-Amz-Date": `${book.headers["X-Amz-Date"]}`,
          Authorization: `${book.headers.Authorization}`,
          Host: `${book.headers.Host}`,
        },
      }
    );

    try {
      const downloadResult = await downloadResumable.downloadAsync();

      if (downloadResult?.status != 200) {
        return console.log("erro");
      }

      await saveAndroidFile(downloadResult?.uri, fileName);
      await FileSystem.readAsStringAsync(downloadResult?.uri as string, {
        encoding: FileSystem.EncodingType.Base64,
      }).then(async (response) => {
        setOfflineEpub(response);
        await AsyncStorage.setItem(
          "OfflineEpub" + fileName,
          downloadResult?.uri as string
        );
      });
    } catch (e) {
      // navigate('NoInternet')
      console.log(e);
    }
  };

  return (
    <ReaderProvider>
      <ReaderComponent
        LastReadPage={lastLocation}
        BookId={book._id}
        epub={book}
        ReadEpub={OfflineEpub}
      />
    </ReaderProvider>
  );
};

export default memo(ReadPage);
