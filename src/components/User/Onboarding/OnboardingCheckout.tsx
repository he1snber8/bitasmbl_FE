"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
// import { useRouter } from "next/navigation"; // use this if you're on App Router
import { SocialLink, UserUpdateModel } from "@/src/interfaces/userTypes";
import { useUpdateUserMutation } from "src/api/UsersApi";
import { useNavigate } from "react-router-dom";

export default function OnboardingCheckout({
  userName,
  handleBack,
  thirdPartyLinks,
  skills = [],
  bio,
}: {
  userName: string;
  handleBack: () => void;
  thirdPartyLinks: [] | SocialLink[];
  skills?: string[];
  bio?: string;
}) {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (submitting || done) return;

    setSubmitting(true);
    setError(null);

    const payload: UserUpdateModel = {
      skills,
      userSocials: thirdPartyLinks.map((link) => ({
        platform: link.platform,
        urlValue: link.urlValue ?? link.urlValue, // Ensure urlValue is used
      })),
      bio,
    };

    try {
      await updateUser(payload).unwrap();
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError("Something went wrong while submitting.");
    } finally {
      setSubmitting(false);
      setDone(true);

      setTimeout(() => {
        navigate("/home");
      }, 2500);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 items-start text-white">
      <h1 className="text-2xl">Review Your Info</h1>

      <p>
        <strong>Name:</strong> {userName}
      </p>

      <p>
        <strong>Skills:</strong>{" "}
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-block border border-gray-400 rounded px-3 py-1 mr-2 text-sm bg-gray-800"
          >
            {skill}
          </span>
        ))}
      </p>

      <div>
        <strong>Socials:</strong>
        <ul className="mt-2">
          {thirdPartyLinks.length > 0 ? (
            thirdPartyLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.urlValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {link.platform}
                </a>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No social links provided</li>
          )}
        </ul>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleBack}
          className="text-sm text-gray-400 hover:text-white underline"
        >
          Back
        </button>

        {!done && (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
          >
            {submitting
              ? "Submitting..."
              : "Everything looking good? Submit your profile"}
          </button>
        )}
      </div>

      {done && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white text-2xl font-semibold text-center"
          >
            {error ? (
              <span className="text-red-400">❌ {error}</span>
            ) : (
              <>
                🎉 Welcome aboard, {userName}!
                <br />
                Redirecting to your home...
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
