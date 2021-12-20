import { DragEvent, useCallback, useState } from "react";
import classNames from "classnames";
import useConstant from "use-constant";
import { readFileAsDataURL } from "../utils/read-file";

export function ImageUpload({ onSelect }) {
  const [image, setImage] = useState(null);
  const [dragged, setDragged] = useState(false);

  // keep count of dragEnters to avoid calling callback on children drag
  const dragCounter = useConstant(() => ({ count: 0 }));

  // when file selected, call the callback and set image as base64 data url
  const onFileSelect = useCallback(async (fileList: FileList) => {
    if (fileList.length !== 1) {
      return;
    }

    const file = fileList[0];
    const image = await readFileAsDataURL(file);

    setImage(image);
    onSelect(file);
  }, []);

  // on file drop, prevent default and call onFileSelect
  const onDrop = useCallback((event: DragEvent) => {
    event.stopPropagation();
    event.preventDefault();

    onFileSelect(event.dataTransfer.files);

    // reset drag state
    dragCounter.count = 0;
    setDragged(false);
  }, []);

  // just to make drag work
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
  }, []);

  const onDragEnter = useCallback(() => {
    dragCounter.count++;

    if (dragCounter.count === 1) {
      setDragged(true);
    }
  }, []);

  const onDragLeave = useCallback(() => {
    dragCounter.count--;
    if (dragCounter.count === 0) {
      setDragged(false);
    }
  }, []);

  return (
    <div className="flex flex-row w-full justify-center">
      {image && (
        <div className="mr-5">
          <img src={image} className="h-60" />
        </div>
      )}
      <div
        className={classNames(
          "flex",
          "flex-col",
          "justify-center",
          "h-60",
          "text-center",
          "text-lg",
          "font-semibold",
          "border-dashed",
          "border-2",
          "px-6",
          "rounded",
          "border-gray-300",
          { "bg-blue-50": dragged }
        )}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        Drop your image here
        <span className="uppercase">or</span>
        <label htmlFor="upload-input" className="text-blue-700 cursor-pointer">
          Browse
        </label>
        <input
          id="upload-input"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => onFileSelect(e.target.files)}
        ></input>
      </div>
    </div>
  );
}
