import { Formik, Field, Form, FieldProps } from "formik";
import { FC, useState } from "react";
import { css } from "@emotion/react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";
import IssuesList from "./IssuesList";

interface IForms {
  url: string;
}

interface IRepoData {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
}

const FormSearch: FC = () => {
  const [repoData, setRepoData] = useState<IRepoData | null>(null);
  const [issuesOpenArr, setIssuesOpenArr] = useState<[]>([]);
  const [issuesClosedArr, setIssuesClosedArr] = useState<[]>([]);
  const [error, setError] = useState<string | null>(null);

  const initialValues: IForms = { url: "" };

  const onSubmit = async (values: { url: string }, { resetForm }: any) => {
    const { url } = values;
    try {
      // Виділяємо власника та ім'я репозиторію з URL
      const regex = /https:\/\/github.com\/([^/]+)\/([^/]+)/;
      const match = regex.exec(url);
      if (!match) {
        return setError("Invalid GitHub repository URL");
      }

      const [, owner, repo] = match;

      // Виконати запит до GitHub API для отримання даних репозиторію
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,

        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );
      // Виконати запит до GitHub API для отримання даних issues

      const responseIssuesOpen = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=open`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );

      const responseIssuesClosed = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=closed`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );
      setRepoData(response.data);
      setIssuesOpenArr(responseIssuesOpen.data);
      setIssuesClosedArr(responseIssuesClosed.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch repository data:", error);
      setError("Invalid GitHub repository URL");
    }
    resetForm();
  };

  const formStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    position: relative;
    margin-bottom: 10px;
  `;

  const inputStyles = css`
    width: 100%;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
    box-shadow: 2px 2px 2px #ccc;
    font-family: "Handwriting", sans-serif;
    font-size: 16px;
    line-height: 1.25;
  `;

  const buttonStyles = css`
    background-color: #f2f2f2;
    border: 2px solid black;
    border-radius: 8px;
    padding: 10px 20px;
    font-family: "Handwriting", sans-serif;
    box-shadow: 2px 2px 2px #ccc;
    cursor: pointer;
  `;

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "URL is required";
    }
    return error;
  }

  const ownerName =
    repoData &&
    repoData.owner.login.charAt(0).toUpperCase() +
      repoData.owner.login.slice(1).toLowerCase();

  const nameRepo =
    repoData &&
    repoData.name.charAt(0).toUpperCase() +
      repoData.name.slice(1).toLowerCase();

  const stars = repoData && Math.round(repoData.stargazers_count / 1000);

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <Box css={formStyles}>
              <Field name="url" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!form.errors.name && !!form.touched.name}
                  >
                    <Input
                      {...field}
                      placeholder="Enter repo URL"
                      css={inputStyles}
                    />
                    {typeof form.errors.name === "string" && (
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Field>
              <Button type="submit" css={buttonStyles}>
                Load issues
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {repoData && (
        <Flex alignItems="center" mb={12}>
          <Text color="blue.500" fontWeight="700" mr={5}>
            {ownerName} {">"} {nameRepo}
          </Text>
          <StarIcon color="orange.300" mr={1} />
          <Text fontWeight="700">{stars} K stars</Text>
        </Flex>
      )}
      {error && <Text color="red.500">{error}</Text>}
      {repoData && <IssuesList open={issuesOpenArr} close={issuesClosedArr} />}
    </>
  );
};

export default FormSearch;
