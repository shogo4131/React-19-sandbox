"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function Home() {
  // const [name, setName] = useState("");
  // const [error, setError] = useState(null);
  // const [isPending, setIsPending] = useState(false);

  // const handleSubmit = async () => {
  //   console.log("handleSubmit");

  //   setIsPending(true);
  //   const error = await updateName(name);
  //   setIsPending(false);
  //   if (error) {
  //     setError(error as unknown as string);
  //     return;
  //   }
  //   redirect("/path");
  // };

  // return (
  //   <div className="">
  //     <input
  //       className="bg-black text-white"
  //       value={name}
  //       onChange={(event) => setName(event.target.value)}
  //     />
  //     <button
  //       className="border-1 border-black text-black"
  //       onClick={handleSubmit}
  //       disabled={isPending}
  //     >
  //       Update
  //     </button>
  //     {error && <p>{error}</p>}
  //   </div>
  // );

  /**
   * onChangeとか使わずにReactのAPIだけでform送信が完結する
   * バリデーションがclientではなくserver側で実行しないといけない？
   */
  const { pending } = useFormStatus();

  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateName(formData.get("name") as string);
      if (error) {
        return error;
      }
      return null;
    },
    null
  );
  // console.log("isPending", isPending);

  console.log("useFormStatus", pending);

  return (
    <form action={submitAction}>
      <input className="bg-black text-white" name="name" />
      <FromButton>Update</FromButton>
      {error && <p>{error}</p>}
    </form>
  );
}

const FromButton = ({ children }: { children: React.ReactNode }) => {
  const { pending, method, action } = useFormStatus();
  // true
  console.log("pending", pending);
  console.log("method", method);
  console.log("action", action);
  return <Button disabled={pending}>{children}</Button>;
};

// ui ボタン
const Button = ({
  children,
  disabled,
}: {
  children: React.ReactNode;
  disabled: boolean;
}) => {
  return (
    <button type="submit" disabled={disabled}>
      {children}
    </button>
  );
};

async function updateName(name: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(name);
    }, 1000);
  });
}
