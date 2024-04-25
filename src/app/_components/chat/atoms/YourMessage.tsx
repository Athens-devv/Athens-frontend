import { Message } from "@/app/model/Message";
import UserImage from "../../atoms/UserImage";

export default function YourMessage({ message }: { message: Message }) {
  return (
    <div className="flex justify-start items-start p-0.5rem pb-0 h-full">
      <div className="border-1 border-gray-300 w-fit rounded-xl">
        <UserImage
          className="w-60 h-60 under-mobile:w-50 under-mobile:h-50 flex rounded-xl"
          name={message.name}
          w={60}
          h={60}
        />
      </div>
      <div className="p-0.5rem flex flex-col justify-center items-start">
        <div className="text-xs pb-5">{message.name}</div>
        <div className="flex justify-start items-end">
          <div className="max-w-[50vw] whitespace-pre-line bg-blue-200 rounded-tr-xl rounded-bl-xl rounded-br-xl p-0.5rem pl-10 pr-10 text-sm under-mobile:text-xs">
            {message.content}
          </div>
          <div className="flex flex-col justify-end items-end h-full">
            <div className="text-xxs pl-8 h-full">{message.createdAt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}