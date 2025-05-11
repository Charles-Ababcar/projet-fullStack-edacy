import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/code-highlight/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ModalsProvider } from "@mantine/modals";
import { router } from "./routes";

function App() {
  return (
    <>
        <MantineProvider
          theme={{
            primaryColor: "blue",
            fontFamily: "Inter, sans-serif",
          }}
          defaultColorScheme="light"
        >
          <ModalsProvider>
          <RouterProvider router={router} />
          </ModalsProvider>
        </MantineProvider>
    </>
  );
}

export default App;
