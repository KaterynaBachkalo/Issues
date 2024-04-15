import { Formik, Field, Form, FieldProps } from "formik";
import { FC, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { StarIcon } from "@chakra-ui/icons";
import IssuesList from "./IssuesList";
import { useDispatch } from "react-redux";
import { setError, setRepoData } from "../redux/issuesSlice";
import { useSelector } from "react-redux";
import { selectError, selectRepoData } from "../redux/selectors";

interface IForms {
  url: string;
}

const FormSearch: FC = () => {
  const [issuesOpen, setIssuesOpen] = useState<[]>([]);
  const [issuesClosed, setIssuesClosed] = useState<[]>([]);

  const dispatch = useDispatch();

  const repoData = useSelector(selectRepoData);
  const error = useSelector(selectError);

  const initialValues: IForms = { url: "" };

  const onSubmit = async (values: { url: string }, { resetForm }: any) => {
    const { url } = values;
    try {
      const regex = /https:\/\/github.com\/([^/]+)\/([^/]+)/;
      const match = regex.exec(url);
      if (!match) {
        return dispatch(setError("Invalid GitHub repository URL"));
      }

      const [, owner, repo] = match;

      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,

        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );

      const responseIssuesOpen = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=100`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );

      const responseIssuesClosed = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=closed&per_page=100`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_ISSUES_TOKEN}`,
          },
        }
      );

      dispatch(setRepoData(response.data));
      setIssuesOpen(responseIssuesOpen.data);
      setIssuesClosed(responseIssuesClosed.data);
      dispatch(setError(null));
    } catch (error) {
      dispatch(setError("Invalid GitHub repository URL"));
    }
    resetForm();
  };

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
            <Flex
              justifyContent="center"
              alignItems="center"
              gap={5}
              mb={3}
              position="relative"
            >
              <Field name="url" validate={validateName}>
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!form.errors.name && !!form.touched.name}
                  >
                    <Input
                      {...field}
                      placeholder="Enter repo URL"
                      width="100%"
                      p={3}
                      border="2px solid #000"
                      borderRadius={8}
                      boxShadow="2px 2px 2px #ccc"
                      bgColor="#f2f2f2"
                    />
                    {typeof form.errors.name === "string" && (
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                )}
              </Field>
              <Button
                type="submit"
                border="2px solid #000"
                borderRadius={8}
                boxShadow="2px 2px 2px #ccc"
                bgColor="#f2f2f2"
                padding="10px 20px"
              >
                Load issues
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      {repoData && (
        <Flex alignItems="center" mb={12}>
          <Text color="blue.500" fontWeight="700" mr={5}>
            <Link
              href={repoData.owner.html_url}
              target="blank"
              _hover={{ textDecoration: "none" }}
            >
              {ownerName}
            </Link>{" "}
            {">"}{" "}
            <Link
              href={repoData.html_url}
              target="blank"
              _hover={{ textDecoration: "none" }}
            >
              {nameRepo}
            </Link>
          </Text>
          <StarIcon color="orange.300" mr={1} />
          <Text fontWeight="700">{stars} K stars</Text>
        </Flex>
      )}
      {error && <Text color="red.500">{error}</Text>}
      {repoData && <IssuesList open={issuesOpen} close={issuesClosed} />}
    </>
  );
};

export default FormSearch;
