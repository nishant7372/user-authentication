import { useReducer } from "react";

let initialState = {
  document: null,
  isPending: false,
  success: null,
  error: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: null, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  //reference of document
  const ref = projectFireStore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    dispatch(action);
  };

  //add a document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const date = Number(new Date());
      await ref.add({ ...doc, createdAt: date });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err });
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const deletedDocument = await ref.doc(id).delete();
      dispatch({ type: "DELETED_DOCUMENT", payload: deletedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
    }
  };

  return { addDocument, deleteDocument, response };
};
