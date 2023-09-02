export default function conflictError(message)  {
  return {
    name: "ConflictError",
    message,
  };
}
