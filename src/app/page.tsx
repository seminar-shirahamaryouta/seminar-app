import { SEMINAR_CONFIG } from "@/lib/seminar-config";
import SeminarForm from "@/components/seminar-form";

export default function Home() {
  const { title, description, date, time, venue, venueOnline, price, capacity } =
    SEMINAR_CONFIG;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{description}</p>

          <div className="space-y-3 mb-8 bg-gray-50 rounded-md p-4">
            <div className="flex">
              <span className="font-medium w-24 shrink-0">日時</span>
              <span>
                {date} {time}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-24 shrink-0">会場</span>
              <span>
                {venue}
                <br />
                {venueOnline}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-24 shrink-0">参加費</span>
              <span className="text-lg font-bold text-blue-600">
                ¥{price.toLocaleString()}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium w-24 shrink-0">定員</span>
              <span>{capacity}名</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">お申し込みフォーム</h2>
          <SeminarForm />
        </div>
      </div>
    </main>
  );
}
