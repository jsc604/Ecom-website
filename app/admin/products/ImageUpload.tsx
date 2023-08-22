"use client";

import axios from "axios";
import { useRef, useState } from "react";
import Image from "next/image";

const ImageUploader = () => {
  // 1. add reference to input element
  const ref = useRef<HTMLInputElement>(null);
  const [urls, setUrls] = useState<string[]>([]);

  const handleSubmit = async () => {

    // 2. get reference to the input element
    const input = ref.current!;

    // 3. build form data
    const formData = new FormData();
    const files = Array.from(input.files ?? []);
    for (const file of files) {
      formData.append(file.name, file);
    }

    console.log('files: ', files);

    // 4. use axios to send the FormData
    await axios.post("/api/upload", formData);
    setUrls(files.map((file) => `/api/upload/${file.name}`));
  };

  console.log('urls: ', urls);

  return (
    <>
      <input type="file" name="images" ref={ref} multiple onChange={handleSubmit} />

      {/* display uploaded images */}
      <div className="flex gap-4 mt-4 w-full">
        {urls.map((url) => {
          return (
            <Image
              key={url}
              src={url}
              alt={url}
              className="object-cover aspect-square"
              width={100}
              height={100}
            />
          );
        })}
      </div>
    </>
  );
};

export default ImageUploader;