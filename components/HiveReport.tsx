export default function HiveReport({ report }: { report: any }) {
  if (!report) return null;

  return (
    <div className="space-y-8">
      <section className="border-l-4 border-blue-500 pl-4">
        <h2 className="text-xl font-semibold">SENSOR PHASE</h2>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
          {JSON.stringify(report.sensor, null, 2)}
        </pre>
      </section>

      <section className="border-l-4 border-yellow-500 pl-4">
        <h2 className="text-xl font-semibold">PROCESSOR PHASE</h2>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
          {JSON.stringify(report.processor, null, 2)}
        </pre>
      </section>

      <section className="border-l-4 border-green-500 pl-4">
        <h2 className="text-xl font-semibold">ACTUATOR PHASE</h2>
        <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
          {JSON.stringify(report.actuator, null, 2)}
        </pre>
      </section>
    </div>
  );
}
