import { appendCharacterCdnCacheBust } from "../config/characterCdn";

describe("appendCharacterCdnCacheBust", () => {
  it("returns the url unchanged when cache bust is omitted", () => {
    const url = "https://cdn.example.com/equipment/item/male/sprite.png";
    expect(appendCharacterCdnCacheBust(url)).toBe(url);
    expect(appendCharacterCdnCacheBust(url, "")).toBe(url);
  });

  it("appends uuid query param", () => {
    const url = "https://cdn.example.com/equipment/item/male/sprite.png";
    expect(appendCharacterCdnCacheBust(url, "abc-123")).toBe(
      "https://cdn.example.com/equipment/item/male/sprite.png?uuid=abc-123"
    );
  });

  it("uses ampersand when url already has query params", () => {
    const url = "https://cdn.example.com/sprite.png?foo=bar";
    expect(appendCharacterCdnCacheBust(url, "abc-123")).toBe(
      "https://cdn.example.com/sprite.png?foo=bar&uuid=abc-123"
    );
  });
});
