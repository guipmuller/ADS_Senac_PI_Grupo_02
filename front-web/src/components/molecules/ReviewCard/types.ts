import { AvatarProps } from "@/components/atoms/Avatar/types";
import { RatingStarsProps } from "@/components/atoms/ratingStars/types"
import { TextProps } from "@/components/atoms/Text/types";

export type ReviewCardProps = {
    avatar: AvatarProps;
    name: TextProps;
    ratingStarts: RatingStarsProps;
    review: TextProps;
}