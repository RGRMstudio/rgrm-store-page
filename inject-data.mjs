import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'your_project_id_here', // REPLACE WITH YOUR ID
  dataset: 'production',
  useCdn: false,
  token: 'your_admin_token_here', // MUST HAVE 'WRITE' PERMISSIONS
  apiVersion: '2026-03-04',
});

const studies = [
  {
    _type: 'study',
    name: 'STRUCTURAL_VOID_01',
    price: 450,
    category: 'ARCHIVE_SERIES',
    description: 'A study in negative space and brutalist geometry.',
  },
  {
    _type: 'study',
    name: 'MONOLITH_CORE_02',
    price: 820,
    category: 'CORE_COLLECTION',
    description: 'High-density polymer manifestation of the RGRM ethos.',
  },
  {
    _type: 'study',
    name: 'IDENTITY_MATRIX_03',
    price: 1200,
    category: 'SPECIAL_EDITION',
    description: 'Experimental data-driven artifact. Limited registration.',
  }
];

async function main() {
  console.log('🚀 INITIALIZING_DATA_INJECTION...');
  for (const study of studies) {
    try {
      const result = await client.create(study);
      console.log(`✅ CREATED: ${result.name} (ID: ${result._id})`);
    } catch (err) {
      console.error(`❌ FAILED: ${study.name}`, err.message);
    }
  }
  console.log('--- DATA_SYNC_COMPLETE ---');
}

main();
