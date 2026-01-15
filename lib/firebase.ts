// Mock firebase for build without firebase dependencies
// This file replaces the real firebase initialization to allow building
// without the firebase npm package.

const app = {} as any;
const db = {} as any;
const storage = {} as any;
const auth = {} as any;

export { app, db, storage, auth };