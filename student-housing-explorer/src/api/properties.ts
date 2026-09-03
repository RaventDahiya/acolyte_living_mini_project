import seed from '@/data/properties.seed.json';
import type { Property, FetchPropertiesResult } from '@/types/property';

const PROPERTIES = seed as Property[];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function maybeFail(): void {
  if (Math.random() < 0.05) {
    throw new Error('Network request failed. Please try again.');
  }
}

export async function fetchProperties(): Promise<FetchPropertiesResult> {
  await delay(400 + Math.random() * 400);
  maybeFail();
  return {
    data: PROPERTIES,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  await delay(200 + Math.random() * 200);
  maybeFail();
  return PROPERTIES.find((p) => p.id === id) ?? null;
}