import React from "react";

import Card from "../components/card";
import Text from "../components/text";
import InputText from "../components/input-text";
import ButtonIcon from "../components/button-icon";
import InputCheckbox from "../components/input-checkbox";

import { cx } from "class-variance-authority";
import XIcon from "../assets/icons/x.svg?react";
import CheckIcon from "../assets/icons/check.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import PencilIcon from "../assets/icons/pencil.svg?react";
import { TaskState, type Task } from "../models/task";

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(
    task?.state === TaskState.Creating
  );
  const [taskTitle, setTaskTitle] = React.useState("");

  function handleEditTask() {
    setIsEditing(true);
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || "");
  }

  function handleExitEditTask() {
    setIsEditing(false);
  }

  function handleSaveTask(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ id: task.id, title: taskTitle });
    // chamada para a função de atualizar;
    setIsEditing(false);
  }

  return (
    <Card size="md">
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            value={task.concluded?.toString()}
            checked={task.concluded}
          />
          <Text className={cx("flex-1", { "line-through": task?.concluded })}>
            {task?.title}
          </Text>
          <div className="flex gap-1">
            <ButtonIcon icon={TrashIcon} variant="tertiary" />
            <ButtonIcon
              icon={PencilIcon}
              variant="tertiary"
              onClick={handleEditTask}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            autoFocus
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              variant="secondary"
              type="button"
              onClick={handleExitEditTask}
            />
            <ButtonIcon type="submit" icon={CheckIcon} variant="primary" />
          </div>
        </form>
      )}
    </Card>
  );
}