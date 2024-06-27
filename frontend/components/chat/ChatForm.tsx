import { ChatItemEditDTO } from "@/types";
import { View, Text, TextInput, StyleSheet, Image, Pressable, ActivityIndicator, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { uploadToFirebase } from '@/scripts/firebaseConfig'
import { useState } from "react";
import { getFontSize } from "@/utils/fonts";

export interface ChatFormProps {
    chat: ChatItemEditDTO;
    updateChatAttributes: (attributes: Partial<ChatItemEditDTO>) => void;
    saveButton: () => JSX.Element;
}

export default function ChatForm({ chat, updateChatAttributes, saveButton }: ChatFormProps) {
    const [sending, setSending] = useState(false);
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
            try {
                setSending(true)
                const res = await uploadToFirebase(asset.uri, uploadName);
                updateChatAttributes({ image: res.downloadUrl });
            } finally {
                setSending(false)
            }
        }
      };

    return (
        <ScrollView
            style={styles.form}
            keyboardShouldPersistTaps='handled'
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
                padding: 16,
            }}
        >   
            {/* Form */}
            <View style={styles.fieldContainer}>
                <View style={styles.imageRow}>
                    <Pressable style={(pressed) => pressed.pressed ? styles.imagePickerPressed : styles.imagePicker} onPress={pickImage}>
                        <View>
                            { chat.image ?
                                <Image style={styles.contactImage} source={{ uri: chat.image }} />
                                : <View style={styles.imagePlaceholder}></View>
                            }

                            { sending &&
                                <ActivityIndicator style={styles.activityIndicator} animating={sending} size="large" color="#0000ff" />
                            }

                            <Image
                                source={require('@/assets/images/upload_button.png')}
                                style={styles.editOverlay}
                            ></Image>
                        </View>
                    </Pressable>
                </View>
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

                { saveButton() }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flexGrow: 1,
        minWidth: '100%',
    },
    fieldContainer: {
        width: '100%',
        padding: 2,
    },
    inputField: {
        flexGrow: 1,
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        borderRadius: 10,
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: getFontSize(17),
        color: '#333333',
    },
    largeInputField: {
        height: 200,
        textAlignVertical: 'top',
        fontSize: getFontSize(14),
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
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePicker: {

    },
    imagePickerPressed: {
        opacity: 0.5,
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


// /* Text */

// position: absolute;
// width: 0px;
// height: 21px;
// left: 152.5px;
// top: 197px;

// font-family: 'Inter';
// font-style: normal;
// font-weight: 500;
// font-size: 17px;
// line-height: 21px;
// /* identical to box height */

// color: #000000;



// /* Form Input Frame */

// box-sizing: border-box;

// position: absolute;
// width: 335px;
// height: 45px;
// left: 23px;
// top: 185px;

// border: 1px solid #E4E4E4;
// border-radius: 10px;


// /* Text Input Content */

// font-family: 'Inter';
// font-style: normal;
// font-weight: 500;
// font-size: 17px;
// line-height: 21px;
// /* identical to box height */

// color: #333333;

