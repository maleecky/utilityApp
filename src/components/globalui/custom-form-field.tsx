/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface FormFieldIF {
  name: string;
  control: any;
  label?: string;
  type: string;
  placeholder?: string;
}

const CustomFieldField = (props: FormFieldIF) => {
  const { name, control } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {props.label ? <FormLabel>{props.label}</FormLabel> : null}
          <FormControl>
            <RenderInput field={field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const RenderInput = ({ field, ...props }: { field: any } & FormFieldIF) => {
  const { name } = props;
  switch (props.type) {
    case "text":
      return (
        <Input
          type={"text"}
          name={name}
          placeholder={props.placeholder ? props.placeholder : ""}
          {...field}
          className="w-full space-y-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 placeholder:text-xs focus:border-indigo-500 sm:text-sm"
        />
      );
    case "email":
      return (
        <Input
          type={"email"}
          name={name}
          placeholder={props.placeholder}
          {...field}
          className="w-full space-y-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 placeholder:text-xs focus:border-indigo-500 sm:text-sm"
        />
      );
    case "password":
      return (
        <Input
          type={"password"}
          name={name}
          placeholder={props.placeholder}
          {...field}
          className="w-full space-y-0 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 placeholder:text-xs focus:border-indigo-500 sm:text-sm"
        />
      );

    case "phone":
      return (
        <PhoneInput
          placeholder="Enter phone number"
          defaultCountry="TZ"
          international
          className="w-full phone-container space-y-0 pl-3  border border-gray-300 rounded-md shadow-sm !outline-none focus:ring-indigo-500 placeholder:text-xs focus:border-indigo-500 sm:text-sm"
          {...field}
        />
      );

    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a payment method" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Tigo">Tigo</SelectItem>
            <SelectItem value="Mpesa">Mpesa</SelectItem>
            <SelectItem value="Airtel">Airtel</SelectItem>
          </SelectContent>
        </Select>
      );
    default:
      return null;
  }
};

export default CustomFieldField;
