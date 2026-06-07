import { NextRequest, NextResponse } from "next/server";
import { getGalleryFromServer, saveGalleryToServer } from "@/lib/gallery-server";
import { GalleryItem } from "@/lib/gallery";

export async function GET(req: NextRequest) {
  try {
    const gallery = getGalleryFromServer();
    return NextResponse.json(gallery);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newItem: GalleryItem = await req.json();
    if (!newItem || !newItem.id || !newItem.title || !newItem.image || !newItem.category) {
      return NextResponse.json(
        { error: "Insufficient payload fields provided to compile a gallery record." },
        { status: 400 }
      );
    }

    const currentGallery = getGalleryFromServer();
    // Prepend new image to the list
    const updated = [newItem, ...currentGallery];
    saveGalleryToServer(updated);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while posting gallery item" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedItem: GalleryItem = await req.json();
    if (!updatedItem || !updatedItem.id || !updatedItem.title || !updatedItem.image || !updatedItem.category) {
      return NextResponse.json(
        { error: "Insufficient payload fields provided to edit the gallery record." },
        { status: 400 }
      );
    }

    const currentGallery = getGalleryFromServer();
    const updated = currentGallery.map((g) => (g.id === updatedItem.id ? updatedItem : g));
    saveGalleryToServer(updated);

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while updating gallery item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "An explicit gallery 'id' parameter is required for deletion." },
        { status: 400 }
      );
    }

    const currentGallery = getGalleryFromServer();
    const filtered = currentGallery.filter((g) => g.id !== id);
    saveGalleryToServer(filtered);

    return NextResponse.json({ success: true, message: "Gallery item deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error while executing deletion." },
      { status: 500 }
    );
  }
}
