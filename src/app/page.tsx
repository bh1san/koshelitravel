
export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'center', color: '#333' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <h1 style={{ color: '#111', borderBottom: '2px solid #ccc', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Application Status: Test Page</h1>
        <p>If you are seeing this message, it means the core Next.js application is running successfully on the server.</p>
        <p>The "Error 521" was likely caused by a crash within one of the disabled components. The next step will be to re-introduce them one by one to find the specific cause.</p>
      </div>
    </div>
  );
}
