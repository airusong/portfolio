  import React, {useEffect} from "react";
  import { useFormik } from "formik";
  import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Select,
    Textarea,
    VStack,
  } from "@chakra-ui/react";
  import * as Yup from 'yup';
  import FullScreenSection from "./FullScreenSection";
  import useSubmit from "../hooks/useSubmit";
  import {useAlertContext} from "../context/alertContext";

  const LandingSection = () => {
    const {isLoading, response, submit} = useSubmit();
    const { onOpen } = useAlertContext();
    //You need to listen to changes in the response object from the useSubmit hook. Also, when the form is submitted, a loading indicator should be shown in the Submit button. You can use the isLoading property from the useSubmit hook.
    const formik = useFormik({
      initialValues:  {
        firstName: '',
        email: '',
        type: 'hireMe',
        comment: ''
      },
      onSubmit: (values) => {
        submit("/api/contact", values);
      },
      validationSchema: Yup.object({
        firstName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        type: Yup.string().oneOf(['hireMe', 'openSource', 'other'], 'Invalid type').required("Required"),
        comment: Yup.string().required('Required'),
      }),
    });
    //In addition, the form has to be reset if the response is successful. To achieve this, use the resetForm function from the object returned from the useFormik hook.
    useEffect(() => {
        if(response){
          console.log("Triggering alert with type:", response.type, "and message:", response.message); // Check the parameters before calling onOpen
          onOpen(response.type, response.message);
          if(response.type === "success"){
            formik.resetForm();
          }
        }
    }, [response, onOpen]);
    return (
      <FullScreenSection
        isDarkBackground
        backgroundColor="#512DA8"
        py={16}
        spacing={8}
      >
        <VStack w="1024px" p={32} alignItems="flex-start">
          <Heading as="h1" id="contactme-section">
            Contact me
          </Heading>
          <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                  <FormLabel htmlFor="firstName">Name</FormLabel>
                  <Input
                    id="firstName"
                    name="firstName"
                    {...formik.getFieldProps('firstName')}
                  />
                  {formik.touched.firstName&&formik.errors.firstName?(<FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>):null}
                </FormControl>
                <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email&&formik.errors.email?(<FormErrorMessage>{formik.errors.email}</FormErrorMessage>):null}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                  <Select id="type" name="type">
                    <option value="hireMe">Freelance project proposal</option>
                    <option value="openSource">
                      Open source consultancy session
                    </option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
                <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                  <FormLabel htmlFor="comment">Your message</FormLabel>
                  <Textarea
                    id="comment"
                    name="comment"
                    height={250}
                    {...formik.getFieldProps('comment')}
                  />
                  {formik.touched.comment&&formik.errors.comment?(<FormErrorMessage>{formik.errors.comment}</FormErrorMessage>):null}
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}
        loadingText="Submitting">
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </FullScreenSection>
    );
  };

  export default LandingSection;
