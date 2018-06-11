import React from "react";

import { createEntity, undo } from "metabase/lib/entities";
import * as Urls from "metabase/lib/urls";

import { normal } from "metabase/lib/colors";
import CollectionSelect from "metabase/containers/CollectionSelect";

const Pulses = createEntity({
  name: "pulses",
  path: "/api/pulse",

  objectActions: {
    // FIXME: not implemented in backend
    // @undo("pulse", (o, archived) => archived ? "archived" : "unarchived")
    // setArchived: ({ id }, archived) => Pulses.actions.update({ id, archived }),

    @undo("pulse", "moved")
    setCollection: ({ id }, collection) =>
      Pulses.actions.update({
        id,
        collection_id: collection && collection.id,
      }),
  },

  objectSelectors: {
    getName: pulse => pulse && pulse.name,
    getUrl: pulse => pulse && Urls.pulse(pulse.id),
    getIcon: pulse => "pulse",
    getColor: pulse => normal.yellow,
  },

  form: {
    fields: [
      { name: "name" },
      {
        name: "collection_id",
        title: "Collection",
        // eslint-disable-next-line react/display-name
        type: ({ field }) => <CollectionSelect {...field} />,
      },
    ],
  },
});

export default Pulses;
