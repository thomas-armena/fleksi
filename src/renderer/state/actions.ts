import { createAction } from "@reduxjs/toolkit";
import { ThingObject } from "../../utils/types";

export const finishCreatingThing = createAction<ThingObject>('finishCreatingThing');