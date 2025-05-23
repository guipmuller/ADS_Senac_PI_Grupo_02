import { TextProps } from "@/components/atoms/Text/types";
import { ImageProps } from "next/image"

export type AboutCardProps = {
    image: ImageProps;
    title: TextProps;
    description: TextProps;
}