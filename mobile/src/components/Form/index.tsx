import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import { theme } from "../../theme";
import * as FileSystem from "expo-file-system";
import { styles } from "./styles";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";
import { Button } from "../Button";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { captureScreen } from "react-native-view-shot";
import { api } from "./../../libs/api";
interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackSent,
  onFeedbackCanceled,
}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  function handlerScreenshot() {
    captureScreen({
      format: "png",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  }
  function handlerRemoveScreenshot() {
    setScreenshot(null);
  }
  async function handlerSendFeedback() {
    if (isSendingFeedback) {
      return;
    }
    setIsSendingFeedback(true);
    const screenshotbase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, {
        encoding: "base64",
      }));
    try {
      await api.post("/feedbacks", {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotbase64}`,
        comment,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder={feedbackTypeInfo.placeholder}
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={(text) => setComment(text)}
        placeholderStyle={{
          position: "absolute",
          top: 0,
          left: 0,
          fontSize: 16,
          color: theme.colors.text_secondary,
        }}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handlerScreenshot}
          onRemoveShot={handlerRemoveScreenshot}
          screenshot={screenshot}
        />
        <Button onPress={handlerSendFeedback} isLoading={isSendingFeedback} />
      </View>
    </View>
  );
}
