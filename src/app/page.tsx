// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div>
//         Magna Web v1
//       </div>
//     </main>
//   );
// }

import Section1 from "@/components/section1/main";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      <div>
        <Section1/>
      </div>
    </main>
  );
}
