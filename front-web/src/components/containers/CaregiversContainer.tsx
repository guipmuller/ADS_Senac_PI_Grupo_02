"use client";

import React, { useEffect, useState } from "react";
import { Review, useReviewsApi } from "@/hooks/api/useReviewsApi";
import {
  Professional,
  useCareProfessionalsApi,
} from "@/hooks/api/useCareProfessionalsApi";
import { User, useUsersApi } from "@/hooks/api/useUsersApi";
import { useParams } from "next/navigation";
import CaregiversTemplate from "../templates/caregiversPage/Caregivers";

export default function CaregiversContainer() {
  const { id } = useParams<{ id: string }>();

  const userApi = useUsersApi();
  const professionalApi = useCareProfessionalsApi();
  const reviewApi = useReviewsApi();

  const [user, setUser] = useState<User | null>(null);
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [reviews, setReviews] = useState<Review[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [userRes, profRes] = await Promise.all([
          userApi.getById(id),
          professionalApi.getByUserId(id),
        ]);
        setUser(userRes.data);
        setProfessional(profRes.data);

        const reviewsRes = await reviewApi.getAll({
          idCareProfessional: profRes.data.id?.toString(),
        });
        setReviews(reviewsRes.data);
      } catch (e) {
        console.error(e);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  //console.log(user);
  //console.log(professional);
  //console.log(reviews);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-grey-500"></div>
      </div>
    );
  }

  return (
    <CaregiversTemplate
      user={user}
      professional={professional}
      reviews={reviews}
    />
  );
}
