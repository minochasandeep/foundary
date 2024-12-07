import { Box, Typography, Select, MenuItem } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormSection } from "@/components/common/form-section";
import React from "react";

const serviceProviderValidationSchema = yup.object().shape({
  refrigerationServiceProvider: yup
    .string()
    .required("Service Provider is required"),
  lightingServiceProvider: yup
    .string()
    .required("Service Provider is required"),
  hvacServiceProvider: yup.string().required("Service Provider is required"),
});

interface ServiceProviderData {
  refrigerationServiceProvider: string;
  lightingServiceProvider: string;
  hvacServiceProvider: string;
}

const ServiceProvider = () => {
  const formMethods = useForm<ServiceProviderData>({
    resolver: yupResolver(serviceProviderValidationSchema),
    mode: "onChange",
  });

  const {
    control,
    formState: { errors },
  } = formMethods;

  const options = [
    {
      title: "Title",
      value: "1",
    },
    {
      title: "Service Provider 1",
      value: "2",
    },
    {
      title: "Service Provider 2",
      value: "3",
    },
    { title: "Service Provider 3", value: "4" },
  ];

  return (
    <Box>
      <FormSection pt={0.8} marginRight="8px">
        <Box display="flex" flexDirection="column" marginBottom="15px">
          <Typography color="grey.700">
            Refrigeration Service Provider
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"5px"}
            marginLeft={"-13px"}
            sx={{
              bgcolor: "background.paper",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Controller
              control={control}
              name="refrigerationServiceProvider"
              render={({ field }) => (
                <Select
                  {...field}
                  sx={{
                    width: "100%",
                    height: "20px",
                    "& fieldset": { border: "none" },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={`refrigerationServiceProvider_${option.value}`}
                      value={option.value}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" marginBottom="15px">
          <Typography color="grey.700">Lighting Service Provider</Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"5px"}
            marginLeft={"-13px"}
            sx={{
              bgcolor: "background.paper",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Controller
              control={control}
              name="lightingServiceProvider"
              render={({ field }) => (
                <Select
                  {...field}
                  sx={{
                    width: "100%",
                    height: "20px",
                    "& fieldset": { border: "none" },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={`lightingServiceProvider_${option.value}`}
                      value={option.value}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" marginBottom="10px">
          <Typography color="grey.700">HVAC Service Provider</Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"5px"}
            marginLeft={"-13px"}
            sx={{
              bgcolor: "background.paper",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Controller
              control={control}
              name="hvacServiceProvider"
              render={({ field }) => (
                <Select
                  {...field}
                  sx={{
                    width: "100%",
                    height: "20px",
                    "& fieldset": { border: "none" },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={`hvacServiceProvider_${option.value}`}
                      value={option.value}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </Box>
        </Box>
      </FormSection>
    </Box>
  );
};
export default ServiceProvider;
