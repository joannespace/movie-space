import React from "react";
import { FormProvider as FFormProvider } from "react-hook-form";

function FormProvider({ methods, children, onSubmit }) {
  return (
    <FFormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FFormProvider>
  );
}

export default FormProvider;
