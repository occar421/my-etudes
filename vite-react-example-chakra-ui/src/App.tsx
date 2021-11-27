import { useState } from "react";
import logo from "./logo.svg";
import {
  Box,
  Button,
  Code,
  Flex,
  Image,
  keyframes,
  Link,
  Text,
  usePrefersReducedMotion,
} from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Box textAlign="center">
      <Flex
        as="header"
        bgColor="theme.navy"
        minHeight="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        fontSize="calc(10px + 2vmin)"
        color="white"
        sx={{
          gap: 48,
        }}
      >
        <Image
          src={logo}
          alt="logo"
          height="40vmin"
          pointerEvents="none"
          animation={
            prefersReducedMotion ? undefined : `${logoSpin} infinite 20s linear`
          }
        />
        <Text>Hello Vite + React!</Text>
        <Text>
          <Button
            colorScheme="gray"
            bgColor="gray.200"
            variant="outline"
            color="black"
            padding="2"
            fontSize="inherit"
            fontWeight="inherit"
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </Button>
        </Text>
        <Text>
          Edit{" "}
          <Code colorScheme="transparent" fontSize="inherit">
            App.tsx
          </Code>{" "}
          and save to test HMR updates.
        </Text>
        <Text>
          <Link
            href="https://reactjs.org"
            isExternal
            color="theme.cyan"
            textDecoration="underline"
          >
            Learn React
          </Link>
          {" | "}
          <Link
            href="https://vitejs.dev/guide/features.html"
            isExternal
            color="theme.cyan"
            textDecoration="underline"
          >
            Vite Docs
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default App;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
