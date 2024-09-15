interface Message {
  message: string;
}

export function hasMessageField(obj: unknown): obj is Message {
  return (obj as Message)?.message !== undefined;
}
