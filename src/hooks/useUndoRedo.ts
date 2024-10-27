import { useReducer } from "react";
import { Action, State } from "../interfaces/interfaces";

const initialState: State = {
  transformations: {
    rotation: 0,
    scale: 1,
    flipHorizontal: false,
    flipVertical: false,
  },
  history: [],
  redoStack: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "rotate":
      return {
        ...state,
        history: [...state.history, state.transformations],
        transformations: {
          ...state.transformations,
          rotation: state.transformations.rotation + 90,
        },
        redoStack: [],
      };
    case "scale":
      return {
        ...state,
        history: [...state.history, state.transformations],
        transformations: {
          ...state.transformations,
          scale: Math.max(state.transformations.scale + action.payload, 0.1),
        },
        redoStack: [],
      };
    case "reset":
      return { ...initialState };
    case "flipHorizontal":
      return {
        ...state,
        history: [...state.history, state.transformations],
        transformations: {
          ...state.transformations,
          flipHorizontal: !state.transformations.flipHorizontal,
        },
        redoStack: [],
      };
    case "flipVertical":
      return {
        ...state,
        history: [...state.history, state.transformations],
        transformations: {
          ...state.transformations,
          flipVertical: !state.transformations.flipVertical,
        },
        redoStack: [],
      };
    case "undo":
      if (state.history.length > 0) {
        const previousTransform = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, state.history.length - 1);
        return {
          ...state,
          transformations: previousTransform,
          history: newHistory,
          redoStack: [...state.redoStack, state.transformations],
        };
      }
      return state;
    case "redo":
      if (state.redoStack.length > 0) {
        const nextTransform = state.redoStack[state.redoStack.length - 1];
        const newRedoStack = state.redoStack.slice(
          0,
          state.redoStack.length - 1
        );
        return {
          ...state,
          transformations: nextTransform,
          history: [...state.history, state.transformations],
          redoStack: newRedoStack,
        };
      }
      return state;
    default:
      return state;
  }
};

export const useImageReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
