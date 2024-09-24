import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../../users/providers/UserProvider";
import CardForm from "../components/CardForm";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import normalizeCard from "../helpers/normalization/normalizeCard";
import useCards from "../hooks/useCards";
import cardSchema from "../models/joi-schema/cardSchema";

export default function AddCardPage() {
  const { handleCreateCard } = useCards();
  
  const { user } = useCurrentUser();
  const { value, 
    setData, 
    ...rest
   } = useForm(
    initialCardForm,
    cardSchema,
    () => {
      handleCreateCard({
        ...normalizeCard({ ...value.data }),
        user_id: user._id,
      });
    }
  );
  
    useEffect(() => {
        setData(initialCardForm);
    }, [setData]);

  if (!user) return <Navigate replace to={ROUTES.CARDS} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title={"Add Card"}
        onSubmit={rest.onSubmit}
        onReset={rest.handleReset}
        errors={value.errors}
        validateForm={rest.validateForm}
        onInputChange={rest.handleChange}
        data={value.data}
      />
    </Container>
  );
}
