// 4. Verify Sanity Connection (Identity Registry Blueprints)
  try {
    const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const response = await fetch(`https://${sanityProjectId}.api.sanity.io/v2024-01-01/data/query/production?query=*[_type == "study"][0...1]`);
    
    if (response.ok) {
      console.log('✅ SANITY: Identity Registry Connection Authenticated.');
    } else {
      console.error('❌ SANITY: Blueprint Retrieval Failed. Check Project ID/Dataset.');
    }
  } catch (error) {
    console.error('❌ SANITY: System Unreachable.');
  }
