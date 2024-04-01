export async function bedrockSkinGrabber(username) {
  try {
      const Username = encodeURIComponent(username);
      const xuidResponse = await fetch(`https://api.geysermc.org/v2/xbox/xuid/${Username}`);

      if (!xuidResponse.ok) {
          throw new Error(`Failed to fetch XUID from Bedrock API: ${xuidResponse.status} ${xuidResponse.statusText}`);
      }

      const xuidData = await xuidResponse.json();
      const xuid = xuidData.xuid;

      const skinResponse = await fetch(`https://api.geysermc.org/v2/skin/${xuid}`);

      if (!skinResponse.ok) {
          throw new Error(`Failed to fetch skin data from Bedrock API: ${skinResponse.status} ${skinResponse.statusText}`);
      }

      const skinData = await skinResponse.json();

      return skinData;
  } catch (error) {
      console.error('Error:', error);
      throw new Error(`Error fetching Bedrock skin data: ${error.message}`);
  }
}