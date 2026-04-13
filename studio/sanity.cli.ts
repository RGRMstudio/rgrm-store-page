// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'your_project_id_here', // Replace with your actual ID
    dataset: 'production'             // Replace with your actual dataset
  },
  /**
   * If you are using a custom build strategy or 
   * specific studio path, you can define it here.
   */
});
