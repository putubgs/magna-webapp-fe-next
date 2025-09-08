type StatusChangeProps = {
  status: "waiting" | "approved" | "rejected";
  onClick: (status: "waiting" | "approved" | "rejected") => void;
};

export default function StatusChange({ status, onClick }: StatusChangeProps) {
  return (
    <div className="gap-5 bg-white/8 p-2.5 flex justify-center items-center rounded-lg">
      <div
        onClick={() =>
          onClick(status === "approved" ? "waiting" : "approved")
        }
        className={`cursor-pointer rounded-lg ${
          status === "approved"
            ? "text-green-500 bg-green-100"
            : "bg-white/8 text-white"
        } text-base py-2.5 px-5 rounded transition`}
      >
        Approved
      </div>

      <div
        onClick={() =>
          onClick(status === "rejected" ? "waiting" : "rejected")
        }
        className={`cursor-pointer rounded-lg ${
          status === "rejected"
            ? "text-red-500 bg-red-100"
            : "bg-white/8 text-white"
        } text-base py-2.5 px-5 rounded transition`}
      >
        Rejected
      </div>
    </div>
  );
}