class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let nbVampires = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      nbVampires += 1;
    }
    return nbVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal
    );
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  ancestors() {
    let ancestors = [];

    ancestors.push(this);

    if (this.creator) {
      ancestors = ancestors.concat(this.creator.ancestors());
    }
    return ancestors;
  }

  closestCommonAncestor(vampire) {
    const ancestorsA = this.ancestors();
    const ancestorsB = vampire.ancestors();

    let common = ancestorsA.filter((n) => {
      if (ancestorsB.indexOf(n) !== -1) {
        return n;
      }
    });

    return common[0];
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    let vampire = null;

    if (this.name === name ) {
      vampire = this;
    }

    for ( const childVampire of this.offspring) {
        vampire = vampire || childVampire.vampireWithName(name);
    }

    return vampire;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let totalDescendents = 0;

    for (const offspring of this.offspring) {
      totalDescendents += offspring.totalDescendents + 1;
    }

    return totalDescendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVampires = [];

    if (this.yearConverted > 1980) {
      millenialVampires.push(this);
    }

    for (const childVampire of this.offspring) {
      millenialVampires = millenialVampires.concat(childVampire.allMillennialVampires);
    }
    return millenialVampires;
  }
}

module.exports = Vampire;
