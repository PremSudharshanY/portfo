import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

// Realistic person color palette
const SKIN_COLOR = new THREE.Color("#D4A574");
const SHIRT_COLOR = new THREE.Color("#1B3A5C");
const PANTS_COLOR = new THREE.Color("#2C2C3A");
const SHOE_COLOR = new THREE.Color("#1A1A1A");
const HAIR_COLOR = new THREE.Color("#1C1008");

function applyRealisticColors(character: THREE.Object3D) {
  const allMaterials: { name: string; meshName: string; mat: any }[] = [];

  character.traverse((child: any) => {
    if (child.isMesh && child.material) {
      const meshName = (child.name || "").toLowerCase();

      // Skip monitor/screen/light objects
      if (
        meshName.includes("plane") ||
        meshName.includes("screen") ||
        meshName.includes("light")
      ) {
        return;
      }

      // Handle array of materials
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((mat: any, idx: number) => {
        if (!mat) return;
        const matName = (mat.name || "").toLowerCase();

        allMaterials.push({ name: matName, meshName, mat });

        // Clone to avoid shared references
        const cloned = mat.clone();

        // Log for debugging
        console.log(
          `Mesh: "${child.name}", Material: "${mat.name}", Color: #${mat.color?.getHexString()}`
        );

        // Color mapping based on material name patterns
        const n = matName;

        if (
          n.includes("skin") ||
          n.includes("body") ||
          n.includes("head") ||
          n.includes("face") ||
          n.includes("hand") ||
          n.includes("arm") ||
          n.includes("neck") ||
          n.includes("ear") ||
          n.includes("nose") ||
          n.includes("lip") ||
          n.includes("finger")
        ) {
          if (cloned.color) cloned.color.copy(SKIN_COLOR);
          cloned.roughness = 0.65;
          cloned.metalness = 0.0;
        } else if (
          n.includes("hair") ||
          n.includes("eyebrow") ||
          n.includes("eyelash") ||
          n.includes("brow")
        ) {
          if (cloned.color) cloned.color.copy(HAIR_COLOR);
          cloned.roughness = 0.9;
          cloned.metalness = 0.0;
        } else if (
          n.includes("shirt") ||
          n.includes("top") ||
          n.includes("torso") ||
          n.includes("tshirt") ||
          n.includes("jacket") ||
          n.includes("cloth")
        ) {
          if (cloned.color) cloned.color.copy(SHIRT_COLOR);
          cloned.roughness = 0.8;
          cloned.metalness = 0.05;
        } else if (
          n.includes("pant") ||
          n.includes("trouser") ||
          n.includes("jean") ||
          n.includes("bottom")
        ) {
          if (cloned.color) cloned.color.copy(PANTS_COLOR);
          cloned.roughness = 0.85;
          cloned.metalness = 0.0;
        } else if (
          n.includes("shoe") ||
          n.includes("boot") ||
          n.includes("sole") ||
          n.includes("sneaker")
        ) {
          if (cloned.color) cloned.color.copy(SHOE_COLOR);
          cloned.roughness = 0.5;
          cloned.metalness = 0.1;
        } else {
          // For Blender numbered materials, apply colors based on original color
          // to distinguish body parts heuristically
          const hex = mat.color ? mat.color.getHexString() : "";
          const r = mat.color?.r || 0;
          const g = mat.color?.g || 0;
          const b = mat.color?.b || 0;
          const brightness = (r + g + b) / 3;

          // Light pinkish/beige = likely skin
          if (
            brightness > 0.5 &&
            r > g &&
            r > b &&
            !n.includes("monitor") &&
            hex !== "ffffff"
          ) {
            if (cloned.color) cloned.color.copy(SKIN_COLOR);
            cloned.roughness = 0.65;
            cloned.metalness = 0.0;
          }
          // Very dark colors = likely hair or shoes
          else if (brightness < 0.1 && hex !== "000000") {
            if (cloned.color) cloned.color.copy(HAIR_COLOR);
            cloned.roughness = 0.9;
          }
          // Medium dark = could be clothing
          else if (brightness >= 0.1 && brightness < 0.35) {
            if (cloned.color) cloned.color.copy(PANTS_COLOR);
            cloned.roughness = 0.85;
          }
          // Medium = upper clothing
          else if (brightness >= 0.35 && brightness < 0.5) {
            if (cloned.color) cloned.color.copy(SHIRT_COLOR);
            cloned.roughness = 0.8;
            cloned.metalness = 0.05;
          }
        }

        cloned.needsUpdate = true;
        
        if (Array.isArray(child.material)) {
          child.material[idx] = cloned;
        } else {
          child.material = cloned;
        }
      });
    }
  });
}

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            // Apply realistic person colors
            applyRealisticColors(character);

            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
