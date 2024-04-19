import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import { FC } from "react";
import { IPdfDocumentProps } from "./types.ts";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PdfDocument: FC<IPdfDocumentProps> = ({ first, picture }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <Text>{first}</Text>
        </View>

        <View style={styles.section}>{picture && <Image src={picture} />}</View>
      </Page>
    </Document>
  );
};

export default PdfDocument;
