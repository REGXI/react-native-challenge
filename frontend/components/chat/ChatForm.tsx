import { ChatItemEditDTO } from "@/types";
import { View, Text, TextInput, StyleSheet, Image, Pressable } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/scripts/firebaseConfig'

export interface ChatFormProps {
    chat: ChatItemEditDTO;
    updateChatAttributes: (attributes: Partial<ChatItemEditDTO>) => void;
}

export default function ChatForm({ chat, updateChatAttributes }: ChatFormProps) {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        if (!result.canceled) {
            const asset = result.assets[0]
            const uploadName = asset.fileName ?? (uuid.v4() + '.png')
            const uploadUrl = await uploadImageAsync(asset.uri, uploadName);
            updateChatAttributes({ image: uploadUrl });
        }
      };

    return (
        <View
            style={styles.form}
        >   
            {/* Form */}
            <View style={styles.fieldContainer}>
                <Pressable style={(pressed) => pressed ? styles.imagePickerPressed : styles.imagePicker} onPress={pickImage}>
                    { chat.image ?
                        <Image style={styles.contactImage} source={{ uri: chat.image }} />
                        : <View style={styles.imagePlaceholder}></View>
                    }
                    <Image
                        source={require('@/assets/images/upload_button.png')}
                        style={styles.editOverlay}
                    ></Image>
                </Pressable>
            </View>

            <View style={styles.fieldContainer}>
                {/* Input */}
                <TextInput
                    style={styles.inputField}
                    placeholder="Name"
                    placeholderTextColor={'gray'}
                    value={chat.name}
                    onChangeText={(name) => updateChatAttributes({ name })}
                />
            </View>

            <View style={styles.fieldContainer}>
                {/* Input */}
                <TextInput
                    style={{
                        ...styles.inputField,
                        ...styles.largeInputField
                    }}
                    placeholder="Message"
                    placeholderTextColor={'gray'}
                    multiline
                    value={chat.message}
                    onChangeText={(message) => updateChatAttributes({ message })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    fieldContainer: {
        width: '100%',
    },
    inputField: {
        width: '100%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    largeInputField: {

    },
    editOverlay: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        width: 24,
        height: 24,
        borderRadius: 1000,
        backgroundColor: 'white',
    },
    contactImage: {
        width: 100,
        height: 100,
        borderRadius: 1000,
        backgroundColor: 'lightgray',
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: 'lightgray',
        borderRadius: 1000,
    },
    imagePicker: {
        
    },
    imagePickerPressed: {

    }
})

async function uploadImageAsync(uri: string, filename: string) {
    // to blob
    const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function() {
            reject(new Error('Image upload failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const reference = ref(storage, `/chats/${filename}`);
    await uploadBytes(reference, blob);

    return await getDownloadURL(reference)
}