import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../app/layout/model/activity";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
  submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity,
  submitting,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        description: "",
        category: "",
        date: "",
        city: "",
        venue: "",
      };
    }
  };

  const [activity, setActivity] = useState<IActivity>(initializeForm);

  const handleInputeChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Title"
          onChange={handleInputeChange}
          value={activity.title}
          name="title"
        />
        <Form.TextArea
          rows={2}
          onChange={handleInputeChange}
          placeholder="Description"
          value={activity.description}
          name="description"
        />
        <Form.Input
          onChange={handleInputeChange}
          placeholder="Category"
          value={activity.category}
          name="category"
        />
        <Form.Input
          type="date"
          onChange={handleInputeChange}
          placeholder="Date"
          value={activity.date}
          name="date"
        />
        <Form.Input
          onChange={handleInputeChange}
          placeholder="City"
          value={activity.city}
          name="city"
        />
        <Form.Input
          onChange={handleInputeChange}
          placeholder="Veune"
          value={activity.venue}
          name="venue"
        />
        <Button
          loading={submitting}
          floated="right"
          positive
          type="Submit"
          content="Submit"
        />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
