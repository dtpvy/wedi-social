import { Avatar, Button, Modal, TextInput } from "@mantine/core";
import React from "react";

type Props = {
  opened?: boolean;
  onClose: () => void;
};

const CreatePost = ({ opened = false, onClose }: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Authentication">
      {/* Modal content */}
    </Modal>
  );
};

export default CreatePost;
