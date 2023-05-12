import Alert from "@/Components/Alert";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="z-10">
        <NavBar />
        <Alert />

        <Footer />
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
