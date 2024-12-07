import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceProvider from "./service-providers";
import "@testing-library/jest-dom";
import { FormProvider, useForm } from "react-hook-form";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe("ServiceProvider Component", () => {
  it("renders Refrigeration Service Provider select", () => {
    render(
      <Wrapper>
        <ServiceProvider />
      </Wrapper>,
    );
    expect(
      screen.getByText("Refrigeration Service Provider"),
    ).toBeInTheDocument();
  });

  it("renders Lighting Service Provider select", () => {
    render(
      <Wrapper>
        <ServiceProvider />
      </Wrapper>,
    );
    expect(screen.getByText("Lighting Service Provider")).toBeInTheDocument();
  });

  it("renders HVAC Service Provider select", () => {
    render(
      <Wrapper>
        <ServiceProvider />
      </Wrapper>,
    );
    expect(screen.getByText("HVAC Service Provider")).toBeInTheDocument();
  });
});
